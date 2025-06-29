# backend/llm_strategies/base_strategy.py

from abc import ABC, abstractmethod
from typing import Generator

class LLMStrategy(ABC):
    """Interfaz para las estrategias de LLM, ahora con soporte para streaming."""

    # Dejamos este método por si alguna herramienta necesita una respuesta simple y completa.
    @abstractmethod
    def call_api(self, history: list[dict]) -> str:
        """Devuelve una respuesta completa de la API."""
        pass

    @abstractmethod
    def stream_api(self, history: list[dict]) -> Generator[str, None, None]:
        """
        Devuelve un generador que produce trozos de la respuesta de la API en tiempo real.
        """
        pass