const functions = require('firebase-functions');

exports.onRoleWritten = functions.firestore
  .document('roles/{roleId}')
  .onWrite(async (change, context) => {
    try{
    // Access the parameter `{roleId}` with `context.params`
    const roleId = context.params.roleId;
    const data = change.after.data();
    console.log('Role doc created/updated in firestore: ', roleId);
    console.log('New role data: ', data);
    return;
    }
    catch (error)
    {

    }
  });

  // [START reporterror]

function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = 'errors';
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: { function_name: process.env.FUNCTION_NAME },
    },
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function',
    },
    context: context,
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

// [END reporterror]
