let data            =   [
    { date: '07/01/2017', num: 20 },
    { date: '07/02/2017', num: 37 },
    { date: '07/03/2017', num: 25 },
    { date: '07/04/2017', num: 45 },
    { date: '07/05/2017', num: 23 },
    { date: '07/06/2017', num: 33 },
    { date: '07/07/2017', num: 49 },
    { date: '07/08/2017', num: 40 },
    { date: '07/09/2017', num: 36 },
    { date: '07/10/2017', num: 27 }
];
let chart_width     =   800;
let chart_height    =   400;
let padding = 50;

let timeParse = d3.timeParse('%m/%d/%Y');
let timeFormat = d3.timeFormat('%b %e');

data.forEach(function(e, i) {
    data[i].date = timeParse(e.date);
});

// Create svg element
let svg = d3.select('#chart')
    .append('svg')
    .attr('height', chart_height)
    .attr('width', chart_width);

// Create scales
let xScale = d3.scaleTime()
    .domain([d3.min(data, function(d) {
            return d.date;
        }),
        d3.max(data, function (d) {
            return d.date;
        }
    )])
    .range([padding, chart_width - padding * 2])
;

let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
            return d.num;
        }
    )])
    .range([chart_height - padding, padding])
;

// Radius is not a good representation of circles. Use squareroot
// let rScale = d3.scaleLinear()
//     .domain([0, d3.max(data, function (d) {
//             return d[1];
//         }
//     )])
//     .range([5, 30]);

let aScale = d3.scaleSqrt()
    .domain([0, d3.max(data, function (d) {
            return d.num;
        }
    )])
    .range([0, 25]);

// Create chart
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return xScale(d.date);
    })
    .attr('cy', function(d) {
        return yScale(d.num);
    })
    .attr('r', function(d) {
        return aScale(d.num);
    })
    .attr('fill', '#D1AB0E')
;

// Create labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
        return timeFormat(d.date)
    })
    .attr('x', function(d) {
        return xScale(d.date);
    })
    .attr('y', d => yScale(d.num))
;