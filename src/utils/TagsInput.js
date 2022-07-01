import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Chip } from '@mui/material';
import TextField from '@mui/material/TextField';
import Downshift from 'downshift';

const TagsInput = ({ ...props }) => {
  const { selectedTags, placeholder, tags, ...other } = props;
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);

  const [composing, setComposition] = useState(true);
  const startComposition = () => setComposition(false);
  const endComposition = () => setComposition(true);

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);
  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  const handleKeyDown = (event) => {
    if (composing === true && event.key === 'Enter') {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()  
      );

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!event.target.value.replace(/\s/g, '').length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue('');
      
    }

    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  const handleChange = (item) => {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const TextFieldStyle = {
    '#downshift-multiple-input-label': {color: 'white'},
    '& .MuiOutlinedInput-root': {
      flexWrap: 'wrap',paddingTop: 1,
      '& fieldset': {
        borderColor: 'white',
      },
    '&:hover fieldset': {
        borderColor: 'white',
      },
    },
    '.MuiChip-filledDefault': {border: 'groove', marginRight: 1, marginBottom: 1},
    '#downshift-multiple-input': {color: 'white'},
  }

  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedItem.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      onDelete={handleDelete(item)}
                      sx={{'.MuiChip-label': {color: 'white'}, '.MuiChip-deleteIcon': {color: '#bdbdbd'}}}
                    />
                  )),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,               
                }}
                onCompositionStart={startComposition}
                onCompositionEnd={endComposition}
                {...other}
                {...inputProps}
                sx={TextFieldStyle}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}

TagsInput.defaultProps = {
  tags: [],
};

TagsInput.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagsInput