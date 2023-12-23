import { useRef, useState, useEffect } from 'react';
import extension from '../utils/extensiontools.js';
import connectionDetails from '../utils/extensiontools.js';
import axios from 'axios';

const getFiles = (currDir) => {

    let files = (currDir) => {
        axios.get("http://localhost:3000/listFiles/${}")
    }
}