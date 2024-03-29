let data =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Create SVG Element
let chart_width =   800;
let chart_height =   400;

let svg = d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

let x_scale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, chart_width])
    .paddingInner(0.05)
;

let y_scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chart_height]);

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d){
        return chart_height - y_scale(d);
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale(d);
    })
    .attr( 'fill', '#7ED26D' );

// Create Labels
svg.selectAll( 'text' )
    .data(data)
    .enter()
    .append( 'text' )
    .text(function( d ){
        return d;
    })
    .attr( 'x', function( d, i ){
        return x_scale(i) + x_scale.bandwidth()/ 2;
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d) + 15;
    })
    .attr( 'font-size', 14 )
    .attr( 'fill', '#fff' )
    .attr( 'text-anchor', 'middle' );

// Events
d3.select('button').on('click', function() {
    // data.reverse();
    data[0] = 50;
    y_scale.domain([0, d3.max(data)]);
    svg.selectAll('rect')
        .data(data)
        .transition()
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr( 'y', function(d){
            return chart_height - y_scale(d);
        })
        .attr( 'height', function( d ){
            return y_scale(d);
        });

    svg.selectAll( 'text' )
        .data(data)
        .transition()
        .delay(function(d, i) {
            return i / data.length * 1000;
        })
        .duration(1000)
        .text(function( d ){
            return d;
        })
        .attr( 'y', function(d ){
            return chart_height - y_scale(d) + 15;
        });
});

