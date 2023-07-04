import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { AvatarDropzone } from './account-profile-avatar-dropzone';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile= () => {
  let MyInfor = JSON.parse(localStorage.getItem("user"));
  return(
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
                      {/* {console.log(MyInfor.avatar)} */}
          {/* <Avatar
            src={MyInfor.avatar}

            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          /> */}
          <AvatarDropzone />
          <Typography
            gutterBottom
            variant="h5"
          >
            {MyInfor!=null?MyInfor.name:''}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {MyInfor!=null?MyInfor.address:''}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
