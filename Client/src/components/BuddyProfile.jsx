import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const BuddyProfile = ({ buddy, onBook }) => {
  if (!buddy) return null;

  return (
    <Card
      className="shadow p-3 mb-4 rounded"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <Card.Img
        variant="top"
        src={buddy.photo || "https://via.placeholder.com/150"}
        alt={buddy.name}
        style={{ objectFit: "cover", height: "250px" }}
      />
      <Card.Body>
        <Card.Title>{buddy.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          📍 {buddy.location || "Unknown Location"}
        </Card.Subtitle>

        <div className="mb-2">
          <strong>Skills:</strong>{" "}
          {buddy.skills?.map((skill, idx) => (
            <Badge key={idx} bg="info" className="me-1">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mb-3">
          <strong>Availability:</strong>{" "}
          {buddy.available ? (
            <Badge bg="success">Available</Badge>
          ) : (
            <Badge bg="secondary">Unavailable</Badge>
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => onBook(buddy)}
          disabled={!buddy.available}
        >
          Book Buddy
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BuddyProfile;
