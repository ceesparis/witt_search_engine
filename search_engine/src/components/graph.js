import Plot from "react-plotly.js"
// import JSON from json

const Graph = ({graph_info, show_graph, finalsearch, strict_search}) => {
var str_search = finalsearch.toString();
if (strict_search){
  if(!(/[,]/.test(str_search))) {
    const i = str_search.indexOf('b')
    const j = str_search.indexOf('(')
    str_search = str_search.slice(i+1, j);
  }
}

return (
  <div>
    <Plot
    data={[
      {
        x:Object.keys(graph_info),
        y:Object.values(graph_info),
        type: 'scattergl',
        marker: {color: 'red'},
      },
      // {type: 'line', x: [graph_info], y: [graph_info], marker: true},
    ]}
    layout={ {width: 400, height: 400, title: str_search} }
    />
  </div>
  )}
  export default Graph