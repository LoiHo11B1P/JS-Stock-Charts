
async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    /*
    // I was not able to use the api, i tried it in the browser and it is block by malwarebyte
        
    const response = await fetch('https://api.twelvedata.com/stocks&apikey=072d91d21d6b412584f8ff57874ea5d2',{
    })
    console.log(response)
    let result = response.json()
    */
    
    // MOCK DATA
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];
    
    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock =>({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map( stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => highestPrice(stock)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderWidth: 1
              }]
            
        }
    })

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map( stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => getAveragePrice(stock)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderWidth: 1
              }]
            
        }
    })
}

function getAveragePrice(stock) {
    let sum = 0
    let itemCount = 0
    stock.values.forEach(item =>{
        //console.log(item.close)
        sum += parseFloat(item.close);
        //console.log(sum)
        itemCount++;
    })
    
    return(sum/itemCount)
}

function highestPrice(stock) {
    console.log(stock)
    let highest = 0;
    for(let i = 0; i < stock.values.length; i++) {
        if(stock.values[i].high > highest) {
            highest = stock.values[i].high;
        }
    }
    console.log(highest)
    return highest;
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

main()