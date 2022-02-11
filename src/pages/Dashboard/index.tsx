import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import { Container, Title, Form, Ceps } from './styles';

interface CepProps {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    ddd: string;
}

const Dashboard: React.FC = () => {
    const [newCep, setNewCep] = useState('');
    const [ceps, setCep] = useState<CepProps[]>([]);

    const pesquisarCep = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const response = await api.get(`${newCep}/json/`);
            const cepDados = response.data;

            setCep([...ceps, cepDados]);

        } catch(err){

        }
    };

    return (
        <Container>
            <Title>Pesquise endereços por CEP</Title>

            <Form onSubmit={pesquisarCep}>
                <input
                    type="number"
                    placeholder="Digite o CEP"
                    onChange={e => setNewCep(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            <Ceps>
                {ceps.map(cep => (
                    <a href="#">
                        <p className='uf'>{cep.uf}</p>
                        <div>
                            <strong>{cep.localidade}</strong>
                            <p>Rua: {cep.logradouro}</p>
                            <p>Bairro: {cep.bairro}</p>
                            <p>CEP: {cep.cep}</p>
                            <p>DDD: {cep.ddd}</p>
                        </div>
                    </a>
                ))}
            </Ceps>
        </Container>
    );
};

export default Dashboard;