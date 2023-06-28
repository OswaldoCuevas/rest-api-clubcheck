import { pool } from '../db.js';

export const getUser = async (req, res) => {
    res.send("obteniendo usuario") 
}
export const addUser = async (req, res) => {
  res.send("añadiendo usuario") 
}
export const addListUsers = async (req, res) => {
    res.send("añadiendo lista de usuarios") 
  }
  export const InComingSync = async (req, res) => {
    res.send("sincronización entrante") 
  }
  export const OutBoundSync = async (req, res) => {
    res.send("sincronización saliente") 
  }