import { useState } from "react";
import { IResource, Comment } from '../utils/interfaces';
import CommentsSection from './CommentsSection';
import CommentComponent from './CommentComponent';
import {SubmitComment} from './SubmitComment'
import {
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Card,
    Typography,
    Box,
} from "@mui/material";
import {
  OpenInFull as OpenInFullIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from 'axios';

interface ResourceProps extends IResource {
    handleRefetch: () => void;
}


export const Resource = (props: ResourceProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [refetchComments, setRefetchComments] = useState<number>(1);

    const baseUrl = "https://bibliotech-project.herokuapp.com"

    const handleDeleteResource = () => {
        axios
            .delete(`${baseUrl}/resources/${props.id}`)
            .then(() => props.handleRefetch);
    };

    return (
        <>
            <Card sx={{ width: "250px" }}>
                <Typography variant="h6" component="h6">{props.name}</Typography>
                <Typography>Author: {props.author_id}</Typography>
                <Typography variant="body2">Content type: {props.content_type}</Typography>
                <Typography variant="body2">Tags: {props.tags}</Typography>
                <Typography variant="body2">
                    👍 {props.count_of_likes} 👎 {props.count_of_dislikes} {props.number_of_comments} comments
                </Typography>
                <IconButton color="primary" onClick={() => setOpen(true)}>
                    <Typography>Expand</Typography>
                    <OpenInFullIcon />
                </IconButton>
                <IconButton onClick={handleDeleteResource}>
                    <DeleteIcon />
                </IconButton>
            </Card>
            <Dialog
                fullWidth
                scroll="paper"
                sx={{ height: "100%" }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>{props.name}</DialogTitle>
                <DialogContent style={{ height: "450px" }}>
                    <Typography> Author: {props.author_id} </Typography>
                    <Typography variant="body2">Content type: {props.content_type}</Typography>
                    <Typography variant="body2"> Tags: {props.tags} </Typography>
                    <Typography variant="body2">
                        👍 {props.count_of_likes} 👎 {props.count_of_dislikes} {props.number_of_comments} comments
                    </Typography>
                    <Box
                        style={{
                            position: "absolute",
                            left: "17%",
                            top: "75%",
                        }}
                    >
                        <CommentsSection
                            comments={comments}
                            setRefetchComments={setRefetchComments}
                        />
                    </Box>
                    <Box
                        style={{
                            position: "absolute",
                            left: "17%",
                            top: "65%",
                        }}
                    >
                        <SubmitComment
                            resource_id={props.id}
                            author_id={props.author_id}
                            setRefetchComments={setRefetchComments}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Resource;