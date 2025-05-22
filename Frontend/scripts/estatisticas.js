
    async function carregarEstatisticas() {
        try {
            // Carregar dados das forças
            const responseForcas = await fetch('http://localhost:3000/estatisticas/forcas');
            const dataForcas = await responseForcas.json();

            // Carregar dados dos anos
            const responseAnos = await fetch('http://localhost:3000/estatisticas/anos');
            const dataAnos = await responseAnos.json();

            // Carregar dados de gênero
            const responseGenero = await fetch('http://localhost:3000/estatisticas/genero');
            const dataGenero = await responseGenero.json();

            // Configurar cores
            const coresPadrao = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED'];

            // Gráfico de Forças
            new Chart(document.getElementById('chartForcas'), {
                type: 'pie',
                data: {
                    labels: dataForcas.map(item => item.instituicao),
                    datasets: [{
                        data: dataForcas.map(item => item.total),
                        backgroundColor: coresPadrao
                    }]
                }
            });

            // Gráfico de Anos
            new Chart(document.getElementById('chartAnos'), {
                type: 'bar',
                data: {
                    labels: dataAnos.map(item => item.ano_letivo),
                    datasets: [{
                        label: 'Alunos por Ano',
                        data: dataAnos.map(item => item.total),
                        backgroundColor: '#36A2EB'
                    }]
                }
            });

            // Gráfico de Gênero
            new Chart(document.getElementById('chartGenero'), {
                type: 'doughnut',
                data: {
                    labels: dataGenero.map(item => item.genero),
                    datasets: [{
                        data: dataGenero.map(item => item.total),
                        backgroundColor: ['#FF6384', '#36A2EB']
                    }]
                }
            });

        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }

    // Carregar as estatísticas quando a página carregar
    window.addEventListener('DOMContentLoaded', carregarEstatisticas);
