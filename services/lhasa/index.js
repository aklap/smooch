var fs = require('fs');
var Q = require('q');
var spawn = require('child_process').spawn;
var path = require('path');

// Make sure you append the path with the lambda deployment path, so you can
// execute your own binaries in, say, bin/
process.env["PATH"] = process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"] + '/bin/';

function spawnCmd(cmd, args, opts) {
    var opts = opts||{};
    var basename = path.basename(cmd);

    console.log("[spawn]", cmd, args.join(' '), opts);

    var deferred = Q.defer();
    child = spawn(cmd, args, opts);
    child.stdout.on('data', function(chunk) {
        console.log("[" + basename + ":stdout] " + chunk);
    });

    child.stderr.on('data', function(chunk) {
        console.log("[" + basename + ":stderr] " + chunk);
    });
    child.on('error', function (error) {
        console.log("[" + basename + "] unhandled error:",error);
        deferred.reject(new Error(error));
    });
    child.on('close', function (code, signal) {
        if(signal) {
            deferred.reject("Process killed with signal " + signal);
        } else if(code==0) {
            deferred.resolve(code);
        } else {
            deferred.reject("Process exited with code " + code);
        }
        console.log("[" + basename + "] child process exited with code",code, "signal", signal);
    });

    return deferred.promise;
}

exports.handler = function(event, context) {
    spawnCmd("./lha", ["-a"], {
        cwd: '/tmp'
    }).then(function(result) {
        context.succeed(result);
    }, function(err) {
        context.fail(err);
    });
};
