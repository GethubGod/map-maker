interface QuizModeSelectorProps {
  currentMode: 'countries' | 'capitals' | 'both';
  onModeChange: (mode: 'countries' | 'capitals' | 'both') => void;
}

export default function QuizModeSelector({
  currentMode,
  onModeChange,
}: QuizModeSelectorProps) {
  const modes = [
    { value: 'countries' as const, label: 'Countries Only' },
    { value: 'capitals' as const, label: 'Capitals Only' },
    { value: 'both' as const, label: 'Both' },
  ];

  return (
    <div className="flex gap-2 p-4 bg-white border-b border-gray-200">
      <span className="text-sm font-medium text-gray-700 flex items-center">Mode:</span>
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onModeChange(mode.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              currentMode === mode.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
