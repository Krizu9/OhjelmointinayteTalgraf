import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const companies = {
    "companies": [
        {
            "name": "Apple Inc.",
            "turnover": 365700000000
        },
        {
            "name": "Microsoft Corporation",
            "turnover": 168100000000
        },
        {
            "name": "Amazon.com Inc.",
            "turnover": 386100000000
        },
        {
            "name": "Meta Platforms, Inc. (formerly Facebook)",
            "turnover": 117900000000
        },
        {
            "name": "Alphabet Inc. (Google)",
            "turnover": 229300000000
        },
        {
            "name": "Johnson & Johnson",
            "turnover": 93800000000
        },
        {
            "name": "Procter & Gamble Co.",
            "turnover": 76300000000
        },
        {
            "name": "Visa Inc.",
            "turnover": 23000000000
        },
        {
            "name": "JPMorgan Chase & Co.",
            "turnover": 122800000000
        },
        {
            "name": "Tesla, Inc.",
            "turnover": 46800000000
        },
        {
            "name": "Walmart Inc.",
            "turnover": 559200000000
        },
        {
            "name": "Bank of America Corp.",
            "turnover": 88900000000
        },
        {
            "name": "Intel Corporation",
            "turnover": 77900000000
        }
    ]
}

async function createBubbleChart() {

    const data = JSON.parse(JSON.stringify(companies.companies));
    /* ladataan json data
    const data = await d3.json("http://localhost:3005/companies");
    en luonut githubiin konttia, että olisin voinut luoda json-serveriä, vaan päätin tallentaa datan koodiin.
    */
    // määritetään svg-elementin koko
    const width = 800;
    const height = 600;

    // tallennetaan nimet muuttujaan
    const names = data => data.name.split(" ");

    // otetaan nimet myös värilistaan
    const colorList = data.map(data => data.name);

    // järjestetään liikevaihdon perusteella isoimmasta pienempään tulevaisuutta varten
    const sortedData = data.sort((a, b) => b.turnover - a.turnover);

    // liitetään värit nimilistaan (gimpin värisnipetillä otin värit ohjeista)
    const colorScale = d3.scaleOrdinal()
        .domain(colorList)
        .range(['#6049e7', '#7058e4', '#8063e8', '#9172df', '#a280e1', '#b18edb', '#c29bda', '#d2a8d8', '#e1b7d7', '#efc4d5']);

    // luodaan pakka
    const pack = d3.pack()
        .size([width, height])
        .padding(1);

    // käytetään d3.hierarchy-funktiota, jotta saadaan määritettyä pallojen koko
    const root = pack(d3.hierarchy({ children: sortedData })
        .sum(data => data.turnover));

    // luodaan svg-elementti ja määritetään ominaisuuksia
    const svg = d3.create("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)  // svg elementistä responsiivinen
        .style("height", "auto")    // svg elementistä responsiivinen
        .style("font", "16px sans-serif")
        .attr("text-anchor", "middle");

    // lisätään jokaiselle pallolle oma g-elementti, määritetään sijainti
    const node = svg.append("g")
        .selectAll()
        .data(root.leaves())
        .join("g")
        .attr("transform", data => `translate(${data.x},${data.y})`);

    // otetaan aikaisemmin määritetty väri käyttöön
    node.append("circle")
        .attr("fill", data => colorScale(data.data.name))
        .attr("r", data => data.r);

    // lisätään nimi ominaisuus pallille
    const text = node.append("text");

    // lisätään pallot ja nimet
    text.selectAll()
        .data(data => names(data.data))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (_data, i) => `${i}em`)
        .text(data => data);

    // näytetään vain seitsemän isoimpien liikevaihtojen yritykset, ja piilotetaan muiden nimet
    const largestCompanies = root.leaves().slice(0, 7);
    text.style("visibility", data => largestCompanies.includes(data) ? "visible" : "hidden");

    //pallot on valmiit, joten palautetaan ne modalia varten
    return svg.node();
}

async function createBarChart() {
    const data = JSON.parse(JSON.stringify(companies.companies));

    // Define the size of the SVG container
    const width = 800;
    const height = 600; // Reduce height to fit within modal

    // Create an SVG element
    const svg = d3.create("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Make the SVG responsive
        .style("height", "auto") // Make the SVG responsive
        .style("font", "16px sans-serif");

    // Define the margins and dimensions for the chart area
    const margin = { top: 50, right: 50, bottom: 70, left: 70 }; // lisätään margineja että saadaan arvot ja nimet näkymään
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // skaalataan x akseli
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.left, chartWidth + margin.left])
        .padding(0.1);

    // skaalataan y akseli
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.turnover)])
        .nice()
        .range([chartHeight + margin.top, margin.top]);

    // luodaan palkit
    svg.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.turnover))
        .attr("width", x.bandwidth())
        .attr("height", d => chartHeight + margin.top - y(d.turnover))
        .attr("fill", "#69b3a2");

    // luodaan x akseli
    svg.append("g")
        .attr("transform", `translate(0,${chartHeight + margin.top})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-90)");

    // luodaan y akseli
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(d => {
            const formatValue = d3.format(".2s")(d);
            return formatValue.replace('G', 'B\n'); // vaihdetaan nollat miljardeiski
        }));

    return svg.node();
}





async function createLineChart() {
    const data = JSON.parse(JSON.stringify(companies.companies));

    const width = 800;
    const height = 600;

    // luodaan svg elementti
    const svg = d3.create("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // responsiiviseksi
        .style("height", "auto") // responsiiviseksi
        .style("font", "16px sans-serif");

    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.left, chartWidth + margin.left])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.turnover)])
        .nice()
        .range([chartHeight + margin.top, margin.top]);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => x(d.name) + x.bandwidth() / 2)
            .y(d => y(d.turnover))
        );

    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.name) + x.bandwidth() / 2)
        .attr("cy", d => y(d.turnover))
        .attr("r", 4)
        .attr("fill", "#69b3a2");

    svg.append("g")
        .attr("transform", `translate(0,${chartHeight + margin.top})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-90)");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(d => {
            const formatValue = d3.format(".2s")(d);
            return formatValue.replace('G', 'B\n');
        }));

    return svg.node();
}


// seurataan kunnes modali aukaistaan, ja kutstutaan oikea funktio luomaan haluttu kaavio
document.querySelectorAll(".btn-primary").forEach(button => {
    button.addEventListener("click", async (event) => {
        const chartType = event.target.getAttribute("data-chart-type");
        let chartNode;
        console.log(chartType);

        if (chartType === "bubble") {
            chartNode = await createBubbleChart();
        }
        if (chartType === "bar") {
            chartNode = await createBarChart();
        }
        if (chartType === "line") {
            chartNode = await createLineChart();
        }

        // syötetään kaavio modaliin
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = '';
        modalBody.appendChild(chartNode);
    });
});



