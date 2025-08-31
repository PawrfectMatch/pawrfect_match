import { Avatar , Modal, Box} from "@mui/material";

export function AvatarModal({handleClose, open, onSelectAvatar}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const avatarOptions = [
    "https://res.cloudinary.com/caggel/image/upload/v1756658601/avatar7_y2wltl.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar5_ir4kz9.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658599/avatar6_mok9ke.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar3_mwmsg6.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar4_qsxdos.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar1_e2pbus.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar2_ewjt0j.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658597/avatar8_qk4odn.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658551/avatar_bvtdgu.png",
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-avatar"
      aria-describedby="Choose your avatar"
    >
      <Box sx={style}>
        {avatarOptions.map((image, index) => (
          <Avatar
            key={index}
            src={image}
            sx={{
              width: { sx: 80, md: 100 },
              height: { sx: 80, md: 100 },
              cursor: "pointer",
            }}
            onClick={() => {
              onSelectAvatar(image)
              handleClose()
            }}
         />
        ))}
      </Box>
    </Modal>
  );
}
