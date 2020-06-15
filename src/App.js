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
    const [ titulo, setTitulo] = useState('');
    const [ date, setDate] = useState('');
    

    function loadData() { 
        api.get('/agenda').then((response) => { 
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    // function closeModal() { setOpen(false); }
    const closeModal = () => setOpen(false);

   //Fuação para adicionar uma nova agenda
    function addAgenda() { 
        const title = titulo;
        const data = date;
        api.post('/agenda', { titulo: title, date:data, stats:true}).then((response) => {
        setTitulo('');
        setDate('');
        setOpen(false);
        loadData()
        })
     }
     
     //Função para marcar o compromisso como 'Concluido'
    function markAsConcluido(id, concluido) {
        if(concluido === true){
            api.patch(`/agenda/${id}/pendente`).then((response) => {
                loadData()
            });
        } else {
                api.patch(`/agenda/${id}/concluido`).then((response) => {
                loadData()
            });
        }
    }

      //Função para excluir uma Tarefa da lista.

     function deleteAgenda(id) {
         api.delete(`/agenda/${id}`).then((response) => { 
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
                        <TableCell>Ttulo</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.titulo}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                                <input type="checkbox" 
                                onChange={() => markAsConcluido(item.id, item.concluido)}                   
                                checked={item.concluido === true ? true : false}/>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" size="small" color="secondary" onClick={() => deleteAgenda(item.id)} >Apagar</Button>
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
                Novo
            </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Meus compromissos</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite o titulo do compromisso.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Titulo"
                    label="Agenda"
                    type="text"
                    fullWidth
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
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
                <Button onClick={addAgenda} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default App;
