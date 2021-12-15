import Plot from "react-plotly.js"

const Graph = ({graph_info}) => {
return (
    <Plot
    data={[
      {
        x:Object.keys(graph_info),
        y:Object.values(graph_info),
        type: 'scatter',
        mode: 'lines',
        marker: {color: 'red'},
      },
      // {type: 'line', x: [graph_info], y: [graph_info]},
    ]}
    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
    />
  )}
  export default Graph