import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import { Box, List, ListItem, Typography } from '@mui/material';
import './CalendarComponent.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const actions = useSelector(state => state.actions);

  const onChange = date => {
    setSelectedDate(date);
  };

  const filteredActions = actions ? actions.filter(action => {
    
    const actionDate = new Date(action.date);
    actionDate.setUTCHours(0, 0, 0, 0);
    
    const selectedDateCopy = new Date(selectedDate);
    selectedDateCopy.setUTCHours(0, 0, 0, 0);
    
    return actionDate.getTime() === selectedDateCopy.getTime();
  }) : [];

  const navigate = useNavigate();

  const handleActionClick = (id) => {
    navigate(`/actions/${id}`);
  };
  
  return (
    <Box display="flex">
      <Box mr={2}> 
        <Calendar 
          onChange={onChange}
          value={selectedDate} 
          className="custom-calendar"
        />
      </Box>
      <Box>
        <div className="selected-actions">
          <Typography variant="h5">{selectedDate.toLocaleDateString('es-ES')}</Typography>
          <Box maxHeight="240px" overflow="auto">
          
            <List>
              {filteredActions.length > 0 ? (
                filteredActions.map(action => (
                  
                  <ListItem key={action.id} onClick={() => handleActionClick(action.id)}>
                    <Typography color={action.type === 'ingresos' ? 'green' : 'red'}>
                      {action.type === 'ingresos' ? `+ $${action.quantity}` : `- $${action.quantity}`}
                    </Typography>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Typography variant="h7">No hay movimientos</Typography>
                </ListItem>
              )}
            </List>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default CalendarComponent;
