type LogType = 'info' | 'success' | 'warning' | 'error' | 'neural' | 'quantum';

interface LogEvent {
  message: string;
  type: LogType;
}

type LogListener = (event: LogEvent) => void;

class LogBus {
  private listeners: LogListener[] = [];

  subscribe(listener: LogListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit(message: string, type: LogType = 'info') {
    // Defer execution to avoid "Cannot update a component while rendering a different component"
    // This ensures that state updates triggered by logs happen after the current render cycle.
    setTimeout(() => {
      this.listeners.forEach(listener => listener({ message, type }));
    }, 0);
  }
}

export const logBus = new LogBus();
