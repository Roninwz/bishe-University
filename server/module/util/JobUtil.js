/**
 * Created by wangshuyi on 2017/1/18.
 */

'use strict';
const config = require('../../config/config');
const logger = require('log4js').getLogger("sys");

const schedule = require('node-schedule');
const JobService = require('../../service/system/tool/JobService');
const JobLogService = require('../../service/system/tool/JobLogService');

const JobUtil = {
    init:null,
    method: null,
    schedule: {},

    start: null,
    stop: null,
    run: null,
};

JobUtil.init = function () {
    let thisJob = this;

    global.Job = thisJob;

    JobService.find(config.dbUser.admin).then(jobList => {
        jobList.forEach(job => {
            if(job.status === 'running'){
                thisJob.start(job);
            }
        });
    });
};

JobUtil.start = function (job) {
    let thisJob = this;
    let options = {};
    options.rule = job.schedule;

    thisJob.schedule[job._id] = schedule.scheduleJob(options, () => {
        thisJob.run(job);
    });
};
JobUtil.stop = function (id) {
    let thisJob = this;
    thisJob.schedule[id].cancel();
};
JobUtil.run = function (job) {
    if(JobUtil.method[job.func]){
        return new Promise((resolve, reject) => {
            let param = {};
            job.param.forEach(p => param[p.key] = p.value);
            JobUtil.method[job.func](param).then(success => {
                JobLogService.save(config.dbUser.admin, {
                    job: job._id,
                    result: 1,
                    message: success.message
                }).then(
                    ok => resolve(success)
                );
            }, err => {
                JobLogService.save(config.dbUser.admin, {
                    job: job._id,
                    result: 0,
                    message: err.message
                }).then(
                    ok => reject(err)
                );
            })
        });
    }else{
        return new Promise((resolve, reject) => {
            JobLogService.save(config.dbUser.admin, {
                job: job._id,
                result: 0,
                message: 'Not Found function'
            }).then(
                reject({message: 'Not Found function'})
            );
        })
    }
};

JobUtil.method = require('./JobMethod');

module.exports = JobUtil;