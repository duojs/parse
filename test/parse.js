/**
 * Module Dependencies
 */

var expect = require('expect.js');
var timed = require('timed');
var parse = require('..');

/**
 * Tests
 */

describe('parse()', function(){
  describe('user/repo@ref/path', function(){
    it('should parse correctly', function(){
      expect(parse('user/repo@1.0.0:/index.js')).to.eql({
        slug: 'user/repo@1.0.0:/index.js',
        user: 'user',
        repo: 'repo',
        ref: '1.0.0',
        path: '/index.js',
        provider: 'github.com'
      });
    });

    it('should parse with v1.0.0', function(){
      expect(parse('user/repo@v1.0.0:/dist/css')).to.eql({
        slug: 'user/repo@v1.0.0:/dist/css',
        user: 'user',
        repo: 'repo',
        ref: 'v1.0.0',
        path: '/dist/css',
        provider: 'github.com'
      });
    });

    it('should handle refs with "/" and a path', function() {
      expect(parse('user/repo@add/feature:/dist/css')).to.eql({
        slug: 'user/repo@add/feature:/dist/css',
        user: 'user',
        repo: 'repo',
        ref: 'add/feature',
        path: '/dist/css',
        provider: 'github.com'
      });
    });

    it('should handle refs with "/" and a path with "."', function() {
      expect(parse('user/repo@add/feature:./dist/css')).to.eql({
        slug: 'user/repo@add/feature:./dist/css',
        user: 'user',
        repo: 'repo',
        ref: 'add/feature',
        path: './dist/css',
        provider: 'github.com'
      });
    });

    it('should handle refs with "/" and a path with "."', function() {
      expect(parse('user/repo@add/feature:dist/css')).to.eql({
        slug: 'user/repo@add/feature:dist/css',
        user: 'user',
        repo: 'repo',
        ref: 'add/feature',
        path: 'dist/css',
        provider: 'github.com'
      });
    });
  });

  describe('provider/repo@ref/path', function () {
    it('should parse correctly', function () {
      expect(parse('provider.com/user/repo@1.0.0:/index.js')).to.eql({
        slug: 'provider.com/user/repo@1.0.0:/index.js',
        user: 'user',
        repo: 'repo',
        ref: '1.0.0',
        path: '/index.js',
        provider: 'provider.com'
      });
    });
  });

  describe('user/repo@ref', function(){
    it('should parse correctly', function(){
      expect(parse('user/repo@1.0.0')).to.eql({
        slug: 'user/repo@1.0.0',
        user: 'user',
        repo: 'repo',
        ref: '1.0.0',
        provider: 'github.com'
      });
    });

    it('should parse stars correctly', function() {
      expect(parse('component/emitter@*')).to.eql({
        slug: 'component/emitter@*',
        user: 'component',
        repo: 'emitter',
        ref: '*',
        provider: 'github.com'
      });
    });

    it('should handle semver symbols', function(){
      expect(parse('component/classes@^1.2.1')).to.eql({
        slug: 'component/classes@^1.2.1',
        user: 'component',
        repo: 'classes',
        ref: '^1.2.1',
        provider: 'github.com'
      });
    });
  });

  describe('provider/user/repo@ref', function(){
    it('should parse correctly', function(){
      expect(parse('provider.com/user/repo@1.0.0')).to.eql({
        slug: 'provider.com/user/repo@1.0.0',
        user: 'user',
        repo: 'repo',
        ref: '1.0.0',
        provider: 'provider.com'
      });
    });
  });

  describe('user/repo/path', function(){
    it('should parse correctly', function(){
      expect(parse('user/repo:/index.js')).to.eql({
        slug: 'user/repo:/index.js',
        user: 'user',
        repo: 'repo',
        path: '/index.js',
        provider: 'github.com'
      });
    });
  });

  describe('provider/user/repo/path', function(){
    it('should parse correctly', function(){
      expect(parse('provider.com/user/repo:/index.js')).to.eql({
        slug: 'provider.com/user/repo:/index.js',
        user: 'user',
        repo: 'repo',
        path: '/index.js',
        provider: 'provider.com'
      });
    });
  });

  describe('user/repo', function(){
    it('should parse correctly', function(){
      expect(parse('user/repo')).to.eql({
        slug: 'user/repo',
        user: 'user',
        repo: 'repo',
        provider: 'github.com'
      });
    });
  });

  describe('provider/user/repo', function(){
    it('should parse correctly', function(){
      expect(parse('provider.com/user/repo')).to.eql({
        slug: 'provider.com/user/repo',
        user: 'user',
        repo: 'repo',
        provider: 'provider.com'
      });
    });
  });

  describe('repo', function(){
    it('should parse correctly', function(){
      expect(parse('repo')).to.eql({
        slug: 'repo',
        repo: 'repo',
        provider: 'github.com'
      });
    });
  });

  it('should be memoized', function(){
    timed.reset();
    parse('component/each');
    var goal = timed.since() / 5;

    timed.reset();
    parse('component/each');
    var actual = timed.since();

    expect(actual).to.be.below(goal);
  });
});
