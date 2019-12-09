import {ATTACH_DOC, REMOVE_DOC, ATTACH_ERROR} from './types';

export const attachDoc = ({noteID, file}) => async dispatch => {
    // 64-bit encoded file
    // const file_64 =
};