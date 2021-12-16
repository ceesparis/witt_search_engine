import Plot from "react-plotly.js"

const Graph = ({graph_info, show_graph}) => {
return (
  <div>
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
    layout={ {width: 400, height: 400, title: 'A Fancy Plot'} }
    />
    <button className="graphButton" onClick={show_graph}>hide graph</button>
    </div>
  )}
  export default Graph