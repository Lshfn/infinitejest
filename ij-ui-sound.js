(() => {
  let audio;
  document.addEventListener('click', event => {
    if (!event.isTrusted || event.defaultPrevented) return;
    const control = event.target.closest('button:not([disabled]), .gallery a');
    if (!control) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audio ??= new Context();
    const play = () => {
      const now = audio.currentTime;
      const tone = audio.createOscillator();
      const level = audio.createGain();
      tone.type = 'sine';
      tone.frequency.setValueAtTime(740, now);
      tone.frequency.exponentialRampToValueAtTime(480, now + .065);
      level.gain.setValueAtTime(.001, now);
      level.gain.exponentialRampToValueAtTime(.075, now + .006);
      level.gain.exponentialRampToValueAtTime(.001, now + .085);
      tone.connect(level).connect(audio.destination);
      tone.start(now);
      tone.stop(now + .09);
    };
    if (audio.state === 'running') play();
    else audio.resume().then(play).catch(() => {});
  }, { capture: true });
})();
