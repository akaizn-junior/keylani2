# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- docs
- github page
- glitch demo
- keylani brand/logo
- webpack bundling
- Keylani bind: binds a key or a combination of keys
- Keylani map: adds multiple bindings by an object
- Keylani getAllBindings: see all added bindings
- Keylani listen: listen for all ke bindings
- initial code structure

### Changed

- updated docs with more details

## 0.0.2-alpha

### Added

- 'isActive' key on the list of bindings instead of 'when'
- key verification, so that 'ctrl' or 'capslock' in a key bindings is transformed to 'Control' or 'CapsLock' respectively

## 0.0.3-alpha

### Added

- support to build the library with different features; Keylani could built without the DOM dataset interface

### Removed

- 'when' key from the list of key bindings
