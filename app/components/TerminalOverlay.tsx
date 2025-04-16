import React from 'react'

const TerminalOverlay = () => {
    return (
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="relative bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded-lg p-3 overflow-hidden font-mono">
          {/* Status bar */}
          <div className="flex items-center justify-between mb-2 border-b border-border pb-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <p className="text-xs text-white">SYSTEM ACTIVE</p>
            </div>
            <p className="text-xs font-semibold text-green-500">ID:78412.93</p>
          </div>
  
          <p className="text-sm text-white mb-2 tracking-tight">
            <span >/</span> WORKOUT ANALYSIS COMPLETE
          </p>
  
          <div className="space-y-1.5 text-xs text-white">
            <div className="flex items-center">
              <div className="text-white mr-2">01</div>
              <span>30 min strength training (upper body)</span>
            </div>
            <div className="flex items-center">
              <div className="text-white mr-2">02</div>
              <span>20 min cardio (moderate intensity)</span>
            </div>
            <div className="flex items-center">
              <div className="text-white mr-2">03</div>
              <span>10 min flexibility (recovery)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default TerminalOverlay;