import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      s3: {
        bucket: "digital-test-ttaa-medic-${self:provider.stage}",//nombred el bucket
        event: "s3:ObjectCreated:*",
        existing: true,
        rules: [
          {
            suffix: ".csv",
          },
          {
            prefix: "medics/",
          },
        ],
      },
    },
  ],
};
