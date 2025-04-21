"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

export default function EditProfileModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "",
    bio: user?.bio || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profileImage: user.profileImage || "",
        bio: user.bio || "",
        instagram: user.instagram || "",
        linkedin: user.linkedin || "",
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, ...formData }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
        onClose();
        window.location.reload();
      } else {
        alert("Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Profile Image URL"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Describe yourself"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Instagram Profile URL"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="LinkedIn Profile URL"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
