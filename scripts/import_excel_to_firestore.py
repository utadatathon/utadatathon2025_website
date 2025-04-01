import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os

# Initialize Firebase Admin
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def clean_string(value):
    if pd.isna(value):
        return ''
    return str(value).strip()

def convert_excel_to_firestore():
    # Read the Excel file
    excel_path = "../2025 UTA Datathon(1-77).xlsx"
    df = pd.read_excel(excel_path)
    
    # Get the Firestore collection reference
    registrations_ref = db.collection('registrations')
    
    # Counter for successful and failed imports
    success_count = 0
    failed_count = 0
    
    # Iterate through each row in the Excel file
    for index, row in df.iterrows():
        try:
            # Create a document data dictionary
            doc_data = {
                'firstname': clean_string(row['First and Last Name']).split()[0] if not pd.isna(row['First and Last Name']) else '',
                'lastname': ' '.join(clean_string(row['First and Last Name']).split()[1:]) if not pd.isna(row['First and Last Name']) else '',
                'levelOfStudy': clean_string(row['Level of Study']),
                'linkedinUrl': clean_string(row['Linkedin']),
                'mlhCodeOfConduct': True,  # Setting default values as required by the form
                'mlhEmails': row['May we email you with updates?'].lower() == 'yes' if not pd.isna(row['May we email you with updates?']) else True,
                'mlhPrivacyPolicy': True,  # Setting default values as required by the form
                'phone': '',  # Not available in Excel
                'raceEthnicity': 'Prefer not to say',  # Not available in Excel
                'resume': '',  # Not available in Excel
                'schoolName': clean_string(row['University Name']) or 'University of Texas at Arlington',
                'timestamp': firestore.SERVER_TIMESTAMP,
                'tshirtSize': clean_string(row['Tshirt Size']),
                'userEmail': clean_string(row['UTA Email or Email Address']),
                'userId': f"EXCEL_IMPORT_{index}",
                # Additional fields from Excel that might be useful
                'gender': clean_string(row['Gender']),
                'github': clean_string(row['Github']),
                'dietaryRestrictions': clean_string(row['Dietary Restrictions']),
                'major': clean_string(row['Major']),
                'countryOfResidence': clean_string(row['Country of Residence']),
                'registrationDate': row['Completion time'].isoformat() if not pd.isna(row['Completion time']) else None
            }
            
            # Add document to Firestore
            registrations_ref.add(doc_data)
            success_count += 1
            print(f"✓ Successfully imported row {index + 1}: {doc_data['firstname']} {doc_data['lastname']}")
            
        except Exception as e:
            failed_count += 1
            print(f"✗ Error importing row {index + 1}: {str(e)}")
    
    print(f"\nImport completed!")
    print(f"Successfully imported: {success_count} records")
    print(f"Failed to import: {failed_count} records")

if __name__ == "__main__":
    convert_excel_to_firestore() 