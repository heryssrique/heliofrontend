import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
     Container, 
    Table, 
    TableRow, 
    TableHead,
    TableBody,
    TableCell,  
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    TextField,
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {

    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ disciplina, setDisciplina] = useState('');
    const [ date, setDate] = useState('');
    

    function loadData() { 
        api.get('/tarefa').then((response) => { 
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    // function closeModal() { setOpen(false); }
    const closeModal = () => setOpen(false);

   //Função para adicionar uma nova tarefa
    function addTarefa() { 
        const discipline = disciplina;
        const data = date;
        api.post('/tarefa', { disciplina: discipline, date:data, entregue: true}).then((response) => {
        setDisciplina('');
        setDate('');
        setOpen(false);
        loadData()
        })
     }
     
     //Função para marcar uma Tarefa como 'Não Entregue'
    function markAsEntregue(id, entregue) {
        if(entregue === true){
            api.patch(`/tarefa/${id}/naoentregue`).then((response) => {
                loadData()
            });
        } else {
                api.patch(`/tarefa/${id}/entregue`).then((response) => {
                loadData()
            });
        }
    }

      //Função para excluir uma Tarefa da lista.

     function deleteTarefa(id) {
         api.delete(`/tarefa/${id}`).then((response) => { 
            loadData()
         })
     }
    

      return (
        <>
        <Header />
        <Container maxWidth="lg" className="container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Disciplina</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Entregue?</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.disciplina}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                                <input type="checkbox" 
                                onChange={() => markAsEntregue(item.id, item.entregue)}                   
                                checked={item.entregue === true ? true : false}/>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" size="small" color="secondary" onClick={() => deleteTarefa(item.id)} >Apagar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Minhas Tarefas</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite as tarefas de cada disciplina.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Disciplina"
                    label="Tarefas"
                    type="text"
                    fullWidth
                    value={disciplina}
                    onChange={e => setDisciplina(e.target.value)}
                />
                
                    <TextField
                        margin="dense"
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                   
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={addTarefa} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default App;