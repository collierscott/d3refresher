var data            =   [
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

// Radius is not a good representation of circles. Use square root for area.
// let rScale = d3.scaleLinear()
//     .domain([0, d3.max(data, function (d) {
//             return d[1];
//         }
//     )])
//     .range([5, 30]);

let aScale = d3.scaleSqrt()
    .domain([0, d3.max(data, function (d) {
            return d[1];
        }
    )])
    .range([0, 25]);

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
svg.selectAll('circle')
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
        return aScale(d[1]);
    })
    .attr('fill', '#D1AB0E')
;

// Create labels
// Append a group so labels will not disappear
svg.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
        return '[' + d.join(', ') + ']'
    })
    .attr('x', function(d) {
        return xScale(d[0]);
    })
    .attr('y', d => yScale(d[1]))
;