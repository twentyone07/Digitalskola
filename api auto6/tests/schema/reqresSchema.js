export const schema_createuser = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "job": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "createdAt": {
      "type": "string"
    }
  },
  "required": [
    "name",
    "job",
    "id",
    "createdAt"
  ]
}

export const schema_updateuser = {
  type: "object",
  properties: {
    name: { type: "string" },
    job: { type: "string" },
  },
  required: ["name", "job"]
};
