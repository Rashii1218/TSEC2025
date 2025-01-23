import streamlit as st
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import yagmail
import requests

# Custom styling
st.markdown("""
<style>
    .stTitle {
        color: #FF5A05;
        font-size: 2.5rem !important;
        padding-bottom: 2rem;
    }
    .section-header {
        color: #360498;
        font-size: 1.5rem;
        padding: 1rem 0;
        border-bottom: 2px solid #6C1FC9;
        margin-bottom: 1rem;
    }
    .stButton button {
        background-color: #FF5A05;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
    }
    .stButton button:hover {
        background-color: #6C1FC9;
    }
    .recommendation-card {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border-left: 4px solid #FF5A05;
    }
    div[data-testid="stDataFrame"] {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #6C1FC9;
    }
    .stTextInput label, .stSlider label {
        color: #360498;
        font-weight: 500;
    }
    .stTab {
        background-color: #f8f9fa;
    }
</style>
""", unsafe_allow_html=True)

def send_email_yagmail(recipient_email, recipient_name):
    sender_email = "dcmaureenmiranda@gmail.com"  # Replace with your email
    app_password = "jlej tfht ygjs zsrn"    # Replace with your App Password (Gmail/SMTP)

    subject = "Request to join team"
    body = f"Hi {recipient_name},\n\nI would like to join your team. Please let me know how I can contribute.\n\nBest Regards."

    try:
        # Initialize Yagmail
        yag = yagmail.SMTP(sender_email, app_password)

        # Send email
        yag.send(to=recipient_email, subject=subject, contents=body)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

@st.cache_data
def load_data(file_path):
    try:
        data = pd.read_excel(file_path)
        return data
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return None

def preprocess_data(data):
    le_skill = LabelEncoder()
    le_interest = LabelEncoder()
    
    data['skill_encoded'] = le_skill.fit_transform(data['Skills'])
    data['interest_encoded'] = le_interest.fit_transform(data['Interests'])
    
    return data, le_skill, le_interest

def recommend_students(data, input_data, k=5):
    features = data[['skill_encoded', 'interest_encoded', 'Participation']].values
    
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(features)
    
    input_cluster = kmeans.predict([input_data])[0]
    
    data['cluster'] = kmeans.labels_
    cluster_students = data[data['cluster'] == input_cluster].copy()
    
    cluster_students['similarity_score'] = cluster_students.apply(
        lambda row: np.linalg.norm(np.array(input_data) - np.array(
            [row['skill_encoded'], row['interest_encoded'], row['Participation']]
        )), axis=1
    )
    
    cluster_students = cluster_students.nsmallest(10, 'similarity_score')
    return cluster_students[['Name', 'Skills', 'Interests', 'Participation', 'similarity_score']]

# Initialize session state
if "recommendations" not in st.session_state:
    st.session_state.recommendations = None
if "hardcoded_recommendations" not in st.session_state:
    st.session_state.hardcoded_recommendations = None
if "num_teammates" not in st.session_state:
    st.session_state.num_teammates = 3

# UI Layout
st.title("Team Mates Recommender")

tab1, tab2 = st.tabs(["🎯 Custom Search", "🎨 Personal Recommendations"])

with tab1:
    st.markdown('<p class="section-header">Find Your Perfect Team</p>', unsafe_allow_html=True)
    
    file_path = "dataset.xlsx"
    data = load_data(file_path)
    
    if data is not None:
        data, le_skill, le_interest = preprocess_data(data)

        col1, col2 = st.columns(2)
        with col1:
            skill = st.text_input("🔧 Skill Required:", placeholder="e.g., Python")
        with col2:
            interest = st.text_input("🎯 Interest Area:", placeholder="e.g., AI")
        
        participation = st.slider("📊 Participation Level:", min_value=1, max_value=10, value=5)

        if st.button("🔍 Find Team Mates"):
            if skill and interest:
                try:
                    input_skill = le_skill.transform([skill])[0] if skill in le_skill.classes_ else -1
                    input_interest = le_interest.transform([interest])[0] if interest in le_interest.classes_ else -1
                    
                    if input_skill == -1 or input_interest == -1:
                        st.error("❌ Skill or interest not found in database. Try another.")
                    else:
                        input_data = [input_skill, input_interest, participation]
                        st.session_state.recommendations = recommend_students(data, input_data)
                except Exception as e:
                    st.error(f"Error processing recommendations: {e}")
            else:
                st.error("❌ Please provide both skill and interest.")

with tab2:
    st.markdown('<p class="section-header">Quick Match</p>', unsafe_allow_html=True)
    
    st.session_state.num_teammates = st.number_input(
        "👥 Team Size:", 
        min_value=1, 
        max_value=10, 
        value=st.session_state.num_teammates
    )
    
    if st.button("✨ Get Personal Recommendations"):
        try:
            hardcoded_skill = "AI"
            hardcoded_interest = "Data Science"
            
            hardcoded_skill_encoded = le_skill.transform([hardcoded_skill])[0]
            hardcoded_interest_encoded = le_interest.transform([hardcoded_interest])[0]
            
            hardcoded_input = [hardcoded_skill_encoded, hardcoded_interest_encoded, participation]
            recommendations = recommend_students(data, hardcoded_input, k=5)
            st.session_state.hardcoded_recommendations = recommendations.head(st.session_state.num_teammates)
        except Exception as e:
            st.error(f"❌ Error: {e}")

# Display recommendations with styling
if st.session_state.recommendations is not None:
    st.markdown('<p class="section-header">🌟 Custom Matches</p>', unsafe_allow_html=True)
    for _, student in st.session_state.recommendations.iterrows():
        st.markdown(f"""
        <div class="recommendation-card">
            <h3 style="color: #360498">{student['Name']}</h3>
            <p><strong>Skills:</strong> {student['Skills']}</p>
            <p><strong>Interests:</strong> {student['Interests']}</p>
            <p><strong>Match Score:</strong> {student['similarity_score']:.2f}</p>
            <p><strong>Participation:</strong> {student['Participation']}/10</p>
        </div>
        """, unsafe_allow_html=True)
        if st.button(f"📧 Connect with {student['Name']}", key=f"connect_{student['Name']}"):
            try:
                send_email_yagmail('maureen.miranda.22@spit.ac.in', student['Name'])
                st.success(f"📧 Email successfully sent to {student['Name']}!")
            except Exception as e:
                st.error(f"❌ Failed to send email: {e}")

if st.session_state.hardcoded_recommendations is not None:
    st.markdown('<p class="section-header">✨ Personal Matches</p>', unsafe_allow_html=True)
    styled_df = st.session_state.hardcoded_recommendations.style\
        .format({'similarity_score': '{:.2f}'})\
        .background_gradient(subset=['similarity_score'], cmap='YlOrRd')
    st.dataframe(styled_df)
