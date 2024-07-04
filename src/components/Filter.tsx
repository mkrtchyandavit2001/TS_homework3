import { Select, MenuItem } from "@mui/material"
import { useContext } from "react"
import { EventContext } from "../lib/Context"
import { ActionTypes } from "../lib/types"


export const Filter:React.FC = () => {
    const context  = useContext(EventContext)
    if(!context){
        throw new Error("Outsite a provider...")
    }

    const {state, dispatch} = context
    return  <>
       <Select  sx={{width:300}}
                value = {state.currentFilter}
                onChange={e => dispatch({type:ActionTypes.setFilter, payload:e.target.value})}
            >
            <MenuItem value= {"all"}>All</MenuItem>
            <MenuItem value= {"opera"}>Opera</MenuItem>
            <MenuItem value= {"ballet"}>Ballet</MenuItem>
       </Select>
    </>
}