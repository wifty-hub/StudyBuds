"""File-based persistence for StudyBudds backend"""
import json
import os
from typing import List, Dict, Any
from pathlib import Path

STORAGE_DIR = Path("./data")
STORAGE_DIR.mkdir(exist_ok=True)

# File paths
DOCUMENTS_FILE = STORAGE_DIR / "documents.json"
SUMMARIES_FILE = STORAGE_DIR / "summaries.json"
FLASHCARDS_FILE = STORAGE_DIR / "flashcards.json"
QUIZZES_FILE = STORAGE_DIR / "quizzes.json"
CHAT_HISTORY_FILE = STORAGE_DIR / "chat_history.json"
STUDY_PLANS_FILE = STORAGE_DIR / "study_plans.json"


def load_data(file_path: Path, default: List = None) -> List[Dict[str, Any]]:
    """Load data from JSON file"""
    if default is None:
        default = []
    
    if not file_path.exists():
        return default.copy()
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data if isinstance(data, list) else default.copy()
    except (json.JSONDecodeError, IOError) as e:
        print(f"Error loading {file_path}: {e}")
        return default.copy()


def save_data(file_path: Path, data: List[Dict[str, Any]]) -> bool:
    """Save data to JSON file"""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except IOError as e:
        print(f"Error saving {file_path}: {e}")
        return False


class Storage:
    """Storage manager for all data types"""
    
    def __init__(self):
        self.documents = load_data(DOCUMENTS_FILE, [])
        self.summaries = load_data(SUMMARIES_FILE, [])
        self.flashcards = load_data(FLASHCARDS_FILE, [])
        self.quizzes = load_data(QUIZZES_FILE, [])
        self.chat_history = load_data(CHAT_HISTORY_FILE, [])
        self.study_plans = load_data(STUDY_PLANS_FILE, [])
    
    def save_documents(self):
        """Save documents to file"""
        return save_data(DOCUMENTS_FILE, self.documents)
    
    def save_summaries(self):
        """Save summaries to file"""
        return save_data(SUMMARIES_FILE, self.summaries)
    
    def save_flashcards(self):
        """Save flashcards to file"""
        return save_data(FLASHCARDS_FILE, self.flashcards)
    
    def save_quizzes(self):
        """Save quizzes to file"""
        return save_data(QUIZZES_FILE, self.quizzes)
    
    def save_chat_history(self):
        """Save chat history to file"""
        return save_data(CHAT_HISTORY_FILE, self.chat_history)
    
    def save_study_plans(self):
        """Save study plans to file"""
        return save_data(STUDY_PLANS_FILE, self.study_plans)
    
    def save_all(self):
        """Save all data to files"""
        return (
            self.save_documents() and
            self.save_summaries() and
            self.save_flashcards() and
            self.save_quizzes() and
            self.save_chat_history() and
            self.save_study_plans()
        )


# Global storage instance
storage = Storage()



