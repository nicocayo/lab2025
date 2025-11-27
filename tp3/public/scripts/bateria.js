//Funciones de grabacion y reproduccion

const recordButton = document.getElementById('recordButton');
const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');
const statusText = document.getElementById('status');

let isRecording = false;       
let recordedEvents = [];       
let recordingStartTime = 0;    
let loopId = null;             
let currentBPM = 120;
const bpmInput = document.getElementById('bpmInput');

//  Configuración del Tiempo
Tone.Transport.bpm.value = currentBPM;

const drumSounds = {
    'w': new Tone.Player("../assets/sonidos/drumkit/w.wav").toDestination(),
    'a': new Tone.Player("../assets/sonidos/drumkit/a.wav").toDestination(),
    's': new Tone.Player("../assets/sonidos/drumkit/s.wav").toDestination(),
    'd': new Tone.Player("../assets/sonidos/drumkit/d.wav").toDestination(),
    'h': new Tone.Player("../assets/sonidos/drumkit/h.wav").toDestination(),
    'j': new Tone.Player("../assets/sonidos/drumkit/j.wav").toDestination(),
    'k': new Tone.Player("../assets/sonidos/drumkit/k.wav").toDestination(),
};


statusText.textContent = "Cargando sonidos...";
Tone.loaded().then(() => {
    statusText.textContent = "✅ Sonidos cargados. Listo para grabar.";
    recordButton.disabled = false; 
});


//reproduccion y registro

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const sound = drumSounds[key]; 
    
    if (sound && sound.loaded) { 
        sound.start();
        if (isRecording) { 
            const eventTime = Tone.Transport.now() - recordingStartTime;
            recordedEvents.push({
                key: key,
                time: eventTime
            });
            console.log(`Grabando: ${key} a ${eventTime.toFixed(3)}s`);
        }
    }
});

//grabacion
recordButton.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
        await Tone.start();
    }
    
    isRecording = !isRecording;

    if (isRecording) {
        recordedEvents = []; 
        Tone.Transport.start(); 
        recordingStartTime = Tone.Transport.now(); 
        
        statusText.textContent = '🔴 GRABANDO... Toca tu ritmo.';
        recordButton.textContent = 'DETENER GRABACIÓN';
        playButton.disabled = true;

    } else {
        //fin grabacion

        const recordingDuration = Tone.Transport.now() - recordingStartTime;
        Tone.Transport.loopEnd = recordingDuration;
        Tone.Transport.loop = true; 
        Tone.Transport.stop(); 
        
        statusText.textContent = `Grabación finalizada. Duración: ${recordingDuration.toFixed(2)}s.`;
        recordButton.textContent = 'RE-GRABAR';
        playButton.disabled = false;
    }
});


playButton.addEventListener('click', () => {
    if (recordedEvents.length === 0) {
        statusText.textContent = 'Error: No hay eventos grabados.';
        return; 
    }
    
   
    if (loopId) {
        Tone.Transport.clear(loopId);
    }
    loopId = Tone.Transport.scheduleRepeat(time => {
        
        recordedEvents.forEach(event => {
            const soundToPlay = drumSounds[event.key];
            if (soundToPlay && soundToPlay.loaded) {
                soundToPlay.start(time + event.time);
            }
        });
        
    }, Tone.Transport.loopEnd); 


    Tone.Transport.start();
    statusText.textContent = `▶️ Reproduciendo loop a ${currentBPM} BPM...`;
    playButton.disabled = true;
    stopButton.disabled = false;
});


stopButton.addEventListener('click', () => {
    Tone.Transport.stop();
    if (loopId) {
        Tone.Transport.clear(loopId);
        loopId = null; 
    }
    
    statusText.textContent = 'Loop detenido. Presiona PLAY para reanudar.';
    playButton.disabled = false;
    stopButton.disabled = true;
});

//configuracion bpm

function setBPM() {
    const newBPM = parseInt(bpmInput.value); 
    if (isNaN(newBPM) || newBPM < 40 || newBPM > 300) {
        statusText.textContent = `⚠️ BPM inválido. Rango: 40-300.`;
        bpmInput.value = currentBPM; 
        return;
    }

    Tone.Transport.bpm.value = newBPM;
    
    currentBPM = newBPM;
    
    statusText.textContent = `Tempo actualizado a ${currentBPM} BPM.`;
}
bpmInput.addEventListener('change', setBPM);
bpmInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        setBPM();
        event.target.blur(); 
    }
});