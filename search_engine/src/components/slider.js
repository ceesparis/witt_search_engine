import { Slider } from '@mui/material';

const Slidur = ({year_range, handleChange, handleSearch, valueText}) => {
return (
    <div id='slider'>
        <Slider
        getAriaLabel={() => 'Year range'}
        value={year_range}
        min={1912}
        max={1951}
        onChange={handleChange}
        onChangeCommitted={handleSearch}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
        />
    </div>
)
}

export default Slidur;