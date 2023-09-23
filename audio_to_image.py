import librosa
import librosa.display
from matplotlib import pyplot as plt


x, sr = librosa.load("audio.wav", sr=44100)
X = librosa.stft(x)
Xdb = librosa.amplitude_to_db(abs(X))
plt.figure()
ax = plt.axes()
ax.set_axis_off()
plt.set_cmap('hot')
librosa.display.specshow(Xdb, y_axis='log', x_axis='time',sr=sr)
plt.savefig('./generated_images/image.png', bbox_inches='tight', transparent=True, pad_inches=0.0 )