// Single reusable Audio instance for UI click sound
let clickAudio = null;
let audioCtx = null;

export const playClickSound = () => {
  if (typeof window === 'undefined') return;

  try {
    if (!clickAudio) {
      clickAudio = new Audio('/sounds/click.mp3');
      clickAudio.volume = 0.25; // Soft, premium level
    }
    
    // Reset play state to ensure immediate trigger on quick repeat clicks
    clickAudio.currentTime = 0;
    const playPromise = clickAudio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: Web Audio API synth if audio element is blocked
        playSynthClick();
      });
    }
  } catch (err) {
    playSynthClick();
  }
};

const playSynthClick = () => {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {
    // Ignore context errors
  }
};
