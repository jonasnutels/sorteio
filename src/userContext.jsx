import React, { useState, createContext, useEffect } from 'react';
import { supabase } from './authSupabase/__auth';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [numeros, setNumeros] = useState([]);

  async function getNumeros() {
    const { data } = await supabase
      .from('numeros_rifas')
      .select()
      .order('numero');
    setNumeros(data);
  }

  async function updateNumeroStatus(numeroId, newStatus, nome, telefone) {
    try {
      const { data, error } = await supabase
        .from('numeros_rifas')
        .update({
          status: newStatus,
          nome_comprador: nome,
          numero_celular_comprador: telefone,
        })
        .eq('id', numeroId);

      if (error) {
        console.error('Error updating numero status:', error);
        return;
      }

      // Update the local state with the modified numero
      setNumeros((prevNumeros) =>
        prevNumeros.map((numero) =>
          numero.id === numeroId ? { ...numero, status: newStatus } : numero,
        ),
      );

      console.log('Numero status updated successfully:', data);
    } catch (error) {
      console.error('Error updating numero status:', error.message);
    }
  }

  return (
    <UserContext.Provider
      value={{
        getNumeros,
        updateNumeroStatus,
        numeros,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
