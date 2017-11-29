/* jshint unused:vars, undef:true, browser:true, jquery:true */
$(document).ready(function() {
'use strict';

var GitHub = (function() {
    function callGitHubApi(path, cb, customSettings, paginatedResult) {
        var baseURL = 'https://api.github.com/' + path.replace(/^\//, '');
        var settings = {
            cache: false,
            dataType: 'json',
            method: 'GET',
            url: baseURL,
            beforeSend: function (xhr) {
                var username = $('#ml-gh-access-username').val(),
                    password = $('#ml-gh-access-password').val();
                if (username !== '' && password !== '' && window.btoa) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(username + ':' + password));
                }
            }
        };
        if (customSettings) {
            $.extend(settings, customSettings);
        }
        paginatedResult = paginatedResult ? paginatedResult : null;
        $.ajax(settings)
            .fail(function(xhr, status, error) {
                var message = '';
                if (xhr && xhr.responseJSON && typeof xhr.responseJSON.message === 'string') {
                    message = xhr.responseJSON.message;
                } else {
                    message = error;
                }
                cb(false, message);
            })
            .done(function(data, status, xhr) {
                if (!(data instanceof Array) || data.length === 0) {
                    cb(true, data);
                    return;
                }
                if (paginatedResult === null) {
                    paginatedResult = data;
                } else {
                    paginatedResult = paginatedResult.concat(data);
                }
                var nextUrl = null;
                var linkHeader = xhr.getResponseHeader('Link');
                if (linkHeader) {
                    var matches = /<([^>]+)>\s*;\s*rel\s*=["']next["']/.exec(linkHeader);
                    if (matches) {
                        nextUrl = matches[1];
                    }
                }
                if (!nextUrl) {
                    cb(true, paginatedResult);
                    return;
                }
                callGitHubApi(settings, cb, {url: nextUrl}, paginatedResult);
            })
        ;
    }
    return {
        isValidOwnerName: function(owner) {
            if (typeof owner !== 'string' || owner.length === 0 || owner.length > 39) {
                return false;
            }
            return /^[a-z\d]([a-z\d]|-(?=[a-z\d]))*$/i.test(owner);
        },
        isValidRepositoryName: function(repository) {
            if (typeof repository !== 'string' || repository.length === 0 || repository.length > 100) {
                return false;
            }
            if (['.', '..'].indexOf(repository) >= 0) {
                return false;
            }
            return /^[a-z\d_\-\.]+$/i.test(repository);
        },
        /**
         * https://developer.github.com/v3/repos/branches/#list-branches
         */
        getBranches: function(owner, repository, cb) {
            callGitHubApi('repos/' + owner + '/' + repository + '/branches', cb);
        },
        /**
         * https://developer.github.com/v3/pulls/#list-pull-requests
         */
        getPullRequests: function(owner, repository, cb, filter) {
            var path = 'repos/' + owner + '/' + repository + '/pulls';
            if (filter) {
                var qs = [];
                $.each(filter, function(key, value) {
                    qs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                });
                if (qs.length > 0) {
                    path += '?' + qs.join('&');
                }
            }
            callGitHubApi(path, cb);
        },
        /**
         * https://developer.github.com/v3/pulls/#list-pull-requests
         */
        getPullRequestForBranch: function(owner, repository, branchOwner, branchName, branchSha, cb) {
            GitHub.getPullRequests(
                owner,
                repository,
                function (ok, pullRequests) {
                    if (!ok) {
                        cb(false, 'Failed to retrieve pull requests for ' + owner + '/' + repository + ': ' + pullRequests);
                    }
                    pullRequests = pullRequests.filter(function (pullRequest) {
                        return pullRequest.head.sha === branchSha;
                    });
                    cb(true, pullRequests);
                },
                {state: 'all', head: branchOwner + ':' + branchName}
            );
        }
    };
})();

var Persister = (function() {
    var PREFIX = 'ml-gh-';
    var ok = window.localStorage && window.localStorage.setItem && window.localStorage.getItem;
    function save (key, value) {
        if (!ok) {
            return false;
        }
        try {
            window.localStorage.setItem(PREFIX + key, value);
            return true;
        } catch (e) {
            return false;
        }
    }
    function load(key, defaultValue) {
        if (ok) {
            try {
                var v = window.localStorage.getItem(PREFIX + key);
                if (v !== null) {
                    return v;
                }
            } catch (e) {
            }
        }
        return defaultValue;
    }
    if (ok) {
        $('#ml-gh-base-owner').val(load('base-owner', ''));
        $('#ml-gh-base-repository').val(load('base-repository', ''));
        $('#ml-gh-fork-owner').val(load('fork-owner', ''));
        $('#ml-gh-fork-repository').val(load('fork-repository', ''));
        $('#ml-gh-access-username').val(load('access-username', ''));
    }
    return {
        save: function() {
            save('base-owner', $('#ml-gh-base-owner').val());
            save('base-repository', $('#ml-gh-base-repository').val());
            save('fork-owner', $('#ml-gh-fork-owner').val());
            save('fork-repository', $('#ml-gh-fork-repository').val());
            save('access-username', $('#ml-gh-access-username').val());
        }
    };
})();

var Working = (function() {
    var state = false;
    return {
        get: function() {
            return state;
        },
        set: function(working) {
            state = !!working;
            if (state) {
                $('#ml-gh-go').attr('disabled', 'disabled');
            } else {
                $('#ml-gh-go').removeAttr('disabled');
            }
        }
    };
})();

$('#ml-gh-go').on('click', function (e) {
    e.preventDefault();
    if (Working.get()) {
        return;
    }
    var $i;
    var baseOwner = ($i = $('#ml-gh-base-owner')).val();
    if (!GitHub.isValidOwnerName(baseOwner)) {
        $i.select().focus();
        return;
    }
    var baseRepository = ($i = $('#ml-gh-base-repository')).val();
    if (!GitHub.isValidRepositoryName(baseRepository)) {
        $i.select().focus();
        return;
    }
    var forkOwner = ($i = $('#ml-gh-fork-owner')).val();
    if (!GitHub.isValidOwnerName(forkOwner)) {
        $i.select().focus();
        return;
    }
    var forkRepository = ($i = $('#ml-gh-fork-repository')).val();
    if (!GitHub.isValidRepositoryName(forkRepository)) {
        $i.select().focus();
        return;
    }
    var $outTable = $('#ml-gh-out-table').hide('fast'), $out = $('#ml-gh-out').empty();
    Persister.save();
    Working.set(true);
    function failed(why) {
        window.alert(why);
        Working.set(false);
    }
    GitHub.getBranches(forkOwner, forkRepository, function(ok, branches) {
        if (!ok) {
            failed('Failed to retrieve branches for ' + forkOwner + '/' + forkRepository + ': ' + branches);
            return;
        }
        function done() {
            $.each(branches, function() {
                var branch = this, $tr, $td;
                $out.append($tr = $('<tr />'));
                $tr.append($td = $('<td />'));
                $td.append($('<a />')
                   .text(branch.name)
                   .attr('href', 'https://github.com/' + forkOwner + '/' + forkRepository + '/tree/' + branch.name)
                );
                $.each(['open', 'merged', 'closed'], function (_, state) {
                    $tr.append($td = $('<td />'));
                    var pullRequests = branch.pullRequests[state];
                    if (pullRequests.length === 0) {
                        $td.html('<div class="text-muted">---</div>');
                    } else {
                        var $list;
                        $td.append($list = $('<ul class="list-unstyled" style="margin-bottom: 0" />'));
                        $.each(pullRequests, function() {
                            var pullRequest = this;
                            $list.append($('<li />')
                                .append($('<a />')
                                    .attr('href', pullRequest.html_url)
                                    .attr('title', pullRequest.title)
                                    .text('#' + pullRequest.number.toString())
                                )
                            );
                        });
                    }
                });
            });
            Working.set(false);
            $outTable.show('fast');
        }
        var doneBranches = 0;
        $.each(branches, function() {
            var branch = this;
            GitHub.getPullRequestForBranch(baseOwner, baseRepository, forkOwner, branch.name, branch.commit.sha, function (ok, pullRequests) {
                if (!ok) {
                    failed(pullRequests);
                    return;
                }
                branch.pullRequests = {open: [], merged: [], closed: []};
                $.each(pullRequests, function() {
                    var pullRequest = this;
                    if (pullRequest.state === 'closed' && pullRequest.merged_at) {
                        branch.pullRequests.merged.push(pullRequest);
                    } else {
                        branch.pullRequests[pullRequest.state].push(pullRequest);
                    }
                });
                doneBranches++;
                
                if (doneBranches === branches.length) {
                    done();
                }
            });
        });
    });
});

});
