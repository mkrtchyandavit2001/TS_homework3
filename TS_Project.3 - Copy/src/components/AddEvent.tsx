import { Box, Button, Modal, MenuItem, Select} from "@mui/material"
import { useContext, useState } from "react"
import { TextField } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { addEvent } from "../lib/api"
import { ActionTypes } from "../lib/types"
import { EventContext } from "../lib/Context"

interface Inputs{
    title:string
    date:string
    time:string
    cover:string
    composer:string
    type:string
}

export const AddEvent = () => {
    const context = useContext(EventContext)

    if(!context){
        throw  new Error("Outside of a Provider...")
    }

    const {dispatch} = context


    const [open, setOpen] = useState<boolean>(false)
    const {register, handleSubmit} = useForm<Inputs>()
    const [error, setError] = useState<string>("")
    const [text, setText] = useState<string>("")

    

    const handleAdd:SubmitHandler<Inputs> = data => {
        if(!data.title.trim()){
            return setError("Please enter title")
        }
        setError("")
        if(!data.date.trim()){
            return setError("Please enter date")
        }
        setError("")
        if(!data.time.trim()){
            return setError("Please enter time")
        }
        setError("")
        if(!data.cover.trim()){
            return setError("Please enter cover")
        }
        setError("")
        if(!data.composer.trim()){
            return setError("Please enter composer")
        }
        setError("")

        const input =  addEvent({...data})
        setText("")

        dispatch({type:ActionTypes.addEvent, payload:input})


    }

    return <>
        <Box my = {2}>
            <Button onClick={() => setOpen(true)} variant = "contained">Add</Button>

            <Modal open = {open} onClose={() => setOpen(false)}>
                <Box sx ={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    color: 'blue'
                }}>
                    <form onSubmit={handleSubmit(handleAdd)}>
                        <Box my={2}>
                            <TextField
                                label = "title" 
                                variant = "outlined"
                                {...register("title", {required:true})}
                                onChange={e => setText(e.target.value )}
                            />
                            {error && <p style={{color:"red"}}>{error}</p>}
                        </Box>
                        <Box my = {2}>
                            <TextField
                                label = "date"
                                variant = "outlined"
                                {...register("date", {required:true})}
                                onChange={e => setText(e.target.value )}
                                />
                                {error && <p style={{color:"red"}}>{error}</p>}
                        </Box>
                        <Box>
                            <TextField
                                label = "time"
                                variant = "outlined"
                                {...register("time", {required:true})}
                                onChange={e => setText(e.target.value )}
                            />
                            {error && <p style={{color:"red"}}>{error}</p>}
                        </Box>
                        <Box>
                            <TextField
                                label = "cover"
                                variant = "outlined"
                                {...register("cover", {required:true})}
                                onChange={e => setText(e.target.value )}
                            />
                            {error && <p style={{color:"red"}}>{error}</p>}
                        </Box>
                        <Box>
                            <TextField
                                label = "composer"
                                variant = "outlined"
                                {...register("composer", {required:true})}
                                onChange={e => setText(e.target.value )}
                            />
                            {error && <p style={{color:"red"}}>{error}</p>}
                        </Box>
                        <Box my={2}>
                            <Select sx = {{width:200}} {...register}>
                                <MenuItem value = "opera">Opera</MenuItem>
                                <MenuItem value = "ballet">Ballet</MenuItem>

                            </Select>
                            <Button variant="contained" type="submit">Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    </>
}