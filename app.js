let data =   [];
// let max = data.reduce((a, b) => Math.max(a));

for(let i = 0; i < 30; i++) {
    let num = Math.floor(d3.randomUniform(0, 50)());
    data.push(num);
}

let chartWidth = 800;
let chartHeight = 400;
let barPadding = 5;

let svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

// Create bars
svg.selectAll('div')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
        return i * (chartWidth / data.length);
    })
    .attr('y', function(d) {
        return chartHeight - d * 5;
    })
    .attr('width', chartWidth /data.length - barPadding)
    .attr('height', function(d) {
        return d * 5;
    })
    .attr('fill', '#7ed26d')
;

// Create label
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
        return d;
    })
    .attr('x', function(d, i) {
        return i * (chartWidth / data.length) +
            (chartWidth / data.length - barPadding) / 2;
    })
    .attr('y', function(d) {
        return chartHeight - d * 5 + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
;