let data            =   [
    [ 400, 200 ],
    [ 210,140 ],
    [ 722,300 ],
    [ 70,160 ],
    [ 250,50 ],
    [ 110,280 ],
    [ 699,225 ],
    [ 90, 220 ]
];

let chart_width     =   800;
let chart_height    =   400;
let padding = 50;

// Create svg element
let svg = d3.select('#chart')
    .append('svg')
    .attr('height', chart_height)
    .attr('width', chart_width);

// Create scales
let xScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
            return d[0];
        }
    )])
    .range([padding, chart_width - padding * 2])
;

let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
            return d[1];
        }
    )])
    .range([chart_height - padding, padding])
;

// Clip paths
svg.append('clipPath')
    .attr('id', 'plot-area-clip-path')
    .append('rect')
    .attr('x', padding)
    .attr('y', padding)
    .attr('width', chart_width - padding * 3)
    .attr('height', chart_height - padding * 2);

// Radius is not a good representation of circles. Use square root for area.
// let rScale = d3.scaleLinear()
//     .domain([0, d3.max(data, function (d) {
//             return d[1];
//         }
//     )])
//     .range([5, 30]);

// let aScale = d3.scaleSqrt()
//     .domain([0, d3.max(data, function (d) {
//             return d[1];
//         }
//     )])
//     .range([0, 25]);

// Create axis
let xAxis = d3.axisBottom()
    .scale(xScale);

// let xAxis = d3.axisBottom()
//     .scale(xScale)
//     .tickValues([0, 150, 250, 600, 700]);

svg.append('g')
    .attr('class', 'x-axis')
    .attr(
        'transform',
        'translate(0,' + (chart_height - padding) + ')'
    )
    .call(xAxis);

let yAxis = d3.axisLeft(yScale)
    .ticks(5)
    // .tickFormat(function(d) {
    //     return d + '%'
    // })
;

svg.append('g')
    .attr('class', 'y-axis')
    .attr(
        'transform',
        'translate(' + padding + ',0)'
    )
    .call(yAxis)
;

// Create chart
svg.append('g')
    .attr('id', 'plot-area')
    .attr('clip-path', 'url(#plot-area-clip-path)')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return xScale(d[0]);
    })
    .attr('cy', function(d) {
        return yScale(d[1]);
    })
    .attr('r', function(d) {
        //return aScale(d[1]);
        return 15;
    })
    .attr('fill', '#D1AB0E')
;

// Create labels
// Append a group so labels will not disappear
// svg.append('g')
//     .selectAll('text')
//     .data(data)
//     .enter()
//     .append('text')
//     .text(function(d) {
//         return '[' + d.join(', ') + ']'
//     })
//     .attr('x', function(d) {
//         return xScale(d[0]);
//     })
//     .attr('y', d => yScale(d[1]))
// ;

d3.select('button').on('click', function() {
    // Create some random data
    data = [];
    let max = Math.random() * 1000;
    for(let i = 0; i < 8; i++) {
        let x = Math.floor((Math.random() * max));
        let y = Math.floor((Math.random() * max));
        data.push([x, y]);
    }

    // Update scales
    xScale.domain([0, d3.max(data, function(d) {
        return d[0];
    })]);

    yScale.domain([0, d3.max(data, function(d) {
        return d[1];
    })]);

    let colors = [
        '#FF3F2E', '#AD3AE8', '#4D8FFF', '#3AE8A3', '#B0FF40'
    ];

    let colorIndex = Math.floor(
        Math.random() * colors.length
    );

    svg.selectAll('circle')
        .data(data)
        .transition()
        .duration(1000)
        .on('start', function() {
            d3.select(this)
                .attr('fill', '#f26d2d')
            ;
        })
        .attr('cx', function(d) {
            return xScale(d[0]);
        })
        .attr('cy', function(d) {
            return yScale(d[1]);
        })
        // .on('end', function() {
        //     d3.select(this)
        //         .attr('fill', '#d1ab0e')
        //     ;
        // })
        .transition()
        .attr('fill', colors[colorIndex])
    ;

    // Update axis
    svg.select('.x-axis')
        .transition()
        .duration(1000)
        .call(xAxis);

    svg.select('.y-axis')
        .transition()
        .duration(1000)
        .call(yAxis);
});