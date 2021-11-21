import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useData } from '../hooks/useData';
import { addReview, removeReview } from '../services/review';
import {getAudioBooksByContentId} from '../services/content';

export default function Review(p: {content_id: string, reviewValue: number}) {
  const [value, setValue] = React.useState<number | null>(p.reviewValue);
  return (
    <Box>
      <Rating
        name="rating"
        defaultValue={p.reviewValue}
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          if(newValue) {
            addReview(p.content_id, newValue)
              .then((resolve) => setValue(resolve.value))
              .catch((reject) => {})
          }
        }}
      />
      <button onClick={() => {
        removeReview(p.content_id)
          .then(() => getAudioBooksByContentId(p.content_id).then(
          (resolve) => setValue(resolve.content.pop()?.review || 0)))
          .catch(() => {})
      }
      }>Reset</button>
    </Box>
  );
}