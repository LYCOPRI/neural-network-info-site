document.addEventListener('DOMContentLoaded', () => {
    const neuralNetworks = [
        {
            id: 'cnn',
            name: 'Сверточные нейронные сети (CNN)',
            short_description: 'Идеальны для анализа изображений.',
            description: 'Сверточные нейронные сети (Convolutional Neural Networks, CNN) - это класс глубоких нейронных сетей, наиболее часто применяемый для анализа визуальных изображений. Они используют специальный математический оператор "свертка" для обработки данных, что позволяет им эффективно распознавать паттерны в изображениях.',
            architecture: 'Основные слои: сверточный слой, слой активации (обычно ReLU), объединяющий слой (pooling) и полносвязный слой.'
        },
        {
            id: 'rnn',
            name: 'Рекуррентные нейронные сети (RNN)',
            short_description: 'Подходят для последовательных данных, таких как текст или временные ряды.',
            description: 'Рекуррентные нейронные сети (Recurrent Neural Networks, RNN) — вид нейронных сетей, где связи между элементами образуют направленную последовательность. Это создает внутреннее состояние сети, позволяя ей обрабатывать последовательности произвольной длины, а не только фиксированной, как в других сетях.',
            architecture: 'Состоят из рекуррентных ячеек, которые имеют "память" о предыдущих вычислениях. Вариации включают LSTM (Long Short-Term Memory) и GRU (Gated Recurrent Unit).'
        },
        {
            id: 'gan',
            name: 'Генеративно-состязательные сети (GAN)',
            short_description: 'Используются для генерации нового контента, например, изображений.',
            description: 'Генеративно-состязательные сети (Generative Adversarial Networks, GAN) состоят из двух моделей, которые "соревнуются" друг с другом. Генератор создает новые данные, а дискриминатор пытается отличить настоящие данные от сгенерированных. Это состязание улучшает качество генерируемых данных.',
            architecture: 'Состоит из двух сетей: Генератора и Дискриминатора. Обычно обе являются глубокими нейронными сетями.'
        },
        {
            id: 'transformer',
            name: 'Трансформеры',
            short_description: 'Современная архитектура для обработки естественного языка (NLP).',
            description: 'Трансформер — это архитектура глубокого обучения, представленная в 2017 году, которая произвела революцию в области обработки естественного языка (NLP). Она основана на механизме внимания (attention mechanism), который позволяет модели взвешивать важность различных слов в последовательности.',
            architecture: 'Состоит из кодировщика (Encoder) и декодировщика (Decoder), каждый из которых содержит несколько слоев с механизмами self-attention и полносвязными сетями. Примеры: BERT, GPT.'
        }
    ];

    const nnListContainer = document.getElementById('nn-list');
    const nnDetailsContainer = document.getElementById('nn-details');

    function displayNetworkDetails(network) {
        nnDetailsContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">${network.name}</h2>
                    <p class="card-text">${network.description}</p>
                    <h5>Архитектура</h5>
                    <p class="card-text">${network.architecture}</p>
                    <div class="mt-4">
                        <h5>Визуализация</h5>
                        <canvas id="nn-canvas" width="400" height="200" style="border: 1px solid #ccc;"></canvas>
                        <button class="btn btn-secondary mt-2" id="visualize-btn">Визуализировать</button>
                    </div>
                    <button class="btn btn-primary mt-3" id="back-to-list">Назад к списку</button>
                </div>
            </div>
        `;
        nnListContainer.style.display = 'none';
        nnDetailsContainer.style.display = 'block';

        document.getElementById('back-to-list').addEventListener('click', () => {
            nnDetailsContainer.style.display = 'none';
            nnListContainer.style.display = 'flex';
        });

        document.getElementById('visualize-btn').addEventListener('click', () => {
            drawSimpleNN('nn-canvas');
        });
    }

    function drawSimpleNN(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Определяем слои
        const layers = [
            { count: 3, x: 50, color: '#28a745' },    // Входной слой
            { count: 4, x: 200, color: '#007bff' },   // Скрытый слой
            { count: 2, x: 350, color: '#dc3545' }    // Выходной слой
        ];

        // Рисуем нейроны и связи
        ctx.lineWidth = 0.5;

        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayer = layers[i];
            const nextLayer = layers[i+1];

            for (let j = 0; j < currentLayer.count; j++) {
                const y1 = (height / (currentLayer.count + 1)) * (j + 1);
                for (let k = 0; k < nextLayer.count; k++) {
                    const y2 = (height / (nextLayer.count + 1)) * (k + 1);
                    ctx.beginPath();
                    ctx.moveTo(currentLayer.x, y1);
                    ctx.lineTo(nextLayer.x, y2);
                    ctx.strokeStyle = '#888';
                    ctx.stroke();
                }
            }
        }
        
        // Рисуем нейроны
        layers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                const y = (height / (layer.count + 1)) * (i + 1);
                ctx.beginPath();
                ctx.arc(layer.x, y, 10, 0, 2 * Math.PI);
                ctx.fillStyle = layer.color;
                ctx.fill();
                ctx.strokeStyle = '#333';
                ctx.stroke();
            }
        });
    }

    neuralNetworks.forEach(nn => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${nn.name}</h5>
                    <p class="card-text flex-grow-1">${nn.short_description}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => displayNetworkDetails(nn));
        nnListContainer.appendChild(card);
    });
});
