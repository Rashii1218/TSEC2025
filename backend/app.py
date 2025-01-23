import streamlit as st
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import MultiLabelBinarizer
import yagmail

# Custom styling
st.markdown(
    """
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
    .recommendation-card {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border-left: 4px solid #FF5A05;
    }
</style>
""",
    unsafe_allow_html=True,
)

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
    mlb_skills = MultiLabelBinarizer()
    mlb_interests = MultiLabelBinarizer()

    data['Skills'] = data['Skills'].apply(lambda x: x.split(','))
    data['Interests'] = data['Interests'].apply(lambda x: x.split(','))

    skills_encoded = mlb_skills.fit_transform(data['Skills'])
    interests_encoded = mlb_interests.fit_transform(data['Interests'])

    data_encoded = pd.concat(
        [
            data.reset_index(drop=True),
            pd.DataFrame(skills_encoded, columns=mlb_skills.classes_),
            pd.DataFrame(interests_encoded, columns=mlb_interests.classes_),
        ],
        axis=1,
    )
    return data_encoded, mlb_skills, mlb_interests

def recommend_students(data, input_skills, input_interests, location, participation, k=5):
    # Ensure the dataset contains the required columns
    missing_columns = [col for col in input_skills + input_interests if col not in data.columns]
    if missing_columns:
        st.error(f"❌ Missing columns in the dataset: {', '.join(missing_columns)}")
        return pd.DataFrame()

    # Handle Location column
    if 'Location' not in data.columns:
        st.error("❌ The dataset does not contain a 'Location' column.")
        return pd.DataFrame()
    
    data['Location'] = data['Location'].fillna("").astype(str)  # Ensure Location is non-null

    # Encode input features
    skills_columns = [col for col in input_skills if col in data.columns]
    interests_columns = [col for col in input_interests if col in data.columns]

    # Create feature columns for clustering
    input_features = pd.DataFrame({
        "skills_match": data[skills_columns].sum(axis=1) if skills_columns else 0,
        "interests_match": data[interests_columns].sum(axis=1) if interests_columns else 0,
        "location_match": (data["Location"].str.lower() == location.lower()).astype(int),
        "participation_diff": abs(data["Participation"] - participation),
    })

   

    # Clustering using KMeans
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    input_features["cluster"] = kmeans.fit_predict(input_features)

    # Find the cluster of the last user input (new data point)
    input_cluster = kmeans.predict(input_features.iloc[[-1], :-1])[0]

    # Filter data to the same cluster
    cluster_students = data.iloc[input_features.index[input_features["cluster"] == input_cluster]].copy()

    # Calculate similarity score for ranking
    cluster_students["similarity_score"] = (
        input_features.loc[cluster_students.index, "skills_match"] +
        input_features.loc[cluster_students.index, "interests_match"] +
        input_features.loc[cluster_students.index, "location_match"] -
        input_features.loc[cluster_students.index, "participation_diff"]
    )

    # Sort recommendations by similarity score
    recommendations = cluster_students.sort_values(by="similarity_score", ascending=False)
    return recommendations[["Name", "Skills", "Interests", "Location", "Participation", "similarity_score"]]


# Initialize session state
if "recommendations" not in st.session_state:
    st.session_state.recommendations = None

# UI Layout
st.title("Team Mates Recommender")

file_path = "compatible_dataset.xlsx"
data = load_data(file_path)

if data is not None:
    data, mlb_skills, mlb_interests = preprocess_data(data)

    st.markdown('<p class="section-header">Find Your Perfect Team</p>', unsafe_allow_html=True)

    input_skills = st.multiselect("🔧 Select Required Skills:", options=mlb_skills.classes_)
    input_interests = st.multiselect("🎯 Select Areas of Interest:", options=mlb_interests.classes_)
    location = st.text_input("📍 Preferred Location:", placeholder="e.g., New York")
    participation = st.slider("📊 Participation Level:", min_value=1, max_value=10, value=5)

    if st.button("🔍 Find Team Mates"):
        if input_skills and input_interests and location:
            try:
                st.session_state.recommendations = recommend_students(data, input_skills, input_interests, location, participation)
            except Exception as e:
                st.error(f"Error processing recommendations: {e}")
        else:
            st.error("❌ Please provide all inputs: skills, interests, and location.")

# Display recommendations
if st.session_state.recommendations is not None:
    st.markdown('<p class="section-header">🌟 Recommended Matches</p>', unsafe_allow_html=True)
    for _, student in st.session_state.recommendations.iterrows():
        st.markdown(f"""
        <div class="recommendation-card">
            <h3 style="color: #360498">{student['Name']}</h3>
            <p><strong>Skills:</strong> {', '.join(student['Skills'])}</p>
            <p><strong>Interests:</strong> {', '.join(student['Interests'])}</p>
            <p><strong>Location:</strong> {student['Location']}</p>
            
        </div>
        """, unsafe_allow_html=True)
        if st.button(f"📧 Connect with {student['Name']}", key=f"connect_{student['Name']}"):
            try:
                send_email_yagmail('maureen.miranda.22@spit.ac.in', student['Name'])
                st.success(f"📧 Email successfully sent to {student['Name']}!")
            except Exception as e:
                st.error(f"❌ Failed to send email: {e}")