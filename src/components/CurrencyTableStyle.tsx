import styled from 'styled-components';

interface TdProps {
    isMin?: boolean;
}

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

export const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
`

export const Td = styled.td<TdProps>`
    background: ${props => props.isMin ? 'DodgerBlue' : ''};
    color: ${props => props.isMin ? 'white' : ''};
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
`;