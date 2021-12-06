import * as React from 'react';
import {Box, Rating, Typography} from '@mui/material';
import { addReview, removeReview } from '../services/review';
import { getAudioBooksByContentId } from '../services/content';

export default function Review(p: { content_id: string, reviewValue: number }) {
  const [value, setValue] = React.useState<number | null>(p.reviewValue);
  const [review, setReview] = React.useState<number>(0);

  getAudioBooksByContentId(p.content_id).then(
    (r) => setReview(r.content[0].review)
  ).catch(e => e)

  return (
    <Box sx={{
      display: "flex"
    }}>
      <Rating
        name="rating"
        defaultValue={p.reviewValue}
        value={value}
        precision={0.5}
        onChange={async (e, newValue) => {
          if (newValue) {
            try {
              await removeReview(p.content_id);
              await addReview(p.content_id, newValue)
              const content = await getAudioBooksByContentId(p.content_id);
              setValue(content.content[0].review);
            } catch (e) {
              try {
                await addReview(p.content_id, newValue)
                const content = await getAudioBooksByContentId(p.content_id);
                setValue(content.content[0].review);
              } catch (e) { }
            }
          }
        }}
      />
      <Typography sx={{marginLeft: "15px"}}>Total review: {review.toFixed(2)}</Typography>
    </Box>
  );
}