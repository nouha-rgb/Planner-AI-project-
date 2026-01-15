import os
import json
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ========== STRUCTURATION JOURNALIÈRE ==========
STRUCTURE_PROMPT = """
Tu es un moteur d'organisation de planning journalier.

RÈGLES STRICTES :
- Tu utilises uniquement les objets fournis dans le JSON.
- Tu n'inventes jamais de nouveaux objets.
- Tu ne modifies aucune valeur.
- Chaque jour contient exactement :
  - 3 restaurants (1 matin, 1 après-midi, 1 soir)
  - 3 activités (1 matin, 1 après-midi, 1 soir)
- morning / afternoon / evening servent uniquement à organiser les objets.
- Chaque bloc contient exactement 1 restaurant + 1 activité.

FORMAT DE SORTIE STRICT (JSON) :

{
  "planning": [
    {
      "city": "...",
      "day": 1,
      "hotel": {...},
      "morning": [restaurant, activity],
      "afternoon": [restaurant, activity],
      "evening": [restaurant, activity]
    }
  ]
}
"""

def generate_structured_planning(raw_trip: dict) -> dict:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": STRUCTURE_PROMPT},
            {"role": "user", "content": json.dumps(raw_trip, ensure_ascii=False)}
        ],
        temperature=0
    )

    content = response.choices[0].message.content

    # Sécurité : extraire uniquement le JSON
    start = content.find("{")
    end = content.rfind("}") + 1
    return json.loads(content[start:end])


# ========== DESCRIPTION TEXTE ==========
DESCRIPTION_PROMPT = """
Tu es un assistant spécialisé en génération de texte pour un plan de voyage.

⚠ RÈGLES ABSOLUES (NE JAMAIS VIOLER) ⚠
1. Tu dois utiliser EXCLUSIVEMENT le JSON fourni.
2. Tu n’ajoutes JAMAIS :
   - aucune ville
   - aucun hôtel
   - aucun restaurant
   - aucune activité
3. Tu ne modifies JAMAIS :
   - les jours
   - les nuits
   - les budgets
   - les choix utilisateur
4. Tu ne fais AUCUN calcul :
   - pas de moyenne
   - pas de prix
   - pas de répartition
   - pas de conversion
5. Tu ne complètes PAS les informations manquantes.
6. Tu n'inventes PAS d'adresses, notes, prix, descriptions.
"""

def generate_trip_description(trip_json: dict) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": DESCRIPTION_PROMPT},
            {"role": "user", "content": f"Voici le JSON du plan de voyage :\n\n{trip_json}"}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content
