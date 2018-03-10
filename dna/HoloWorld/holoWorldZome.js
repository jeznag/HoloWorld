'use strict';

// EXPOSED METHODS

function addAnchor(anchorType, anchorText) {
  return call('anchors', 'anchor', {
    anchorType: anchorType,
    anchorText: anchorText
  }).replace(/"/g, '');
}

// creates a holoWorldEntry entry
function holoWorldEntryCreate(entry) {
  var worldAnchor = { anchorType: 'world', anchorText: entry.world };

  try {
    var anchorHash = addAnchor('world', entry.world);
    var entryHash = commit('holoWorldEntry', entry);
    var linkHash = commit('world_entry_link', {
      Links: [
        {
          Base: anchorHash,
          Link: entryHash,
          Tag: 'world'
        }
      ]
    });
  } catch (e) {
    debug(e);
  }

  return entryHash;
}

// retrieves a holoWorldEntry entry
// @param  data  { hash: string }  JSON object sent from UI with hash of entry to retrieve
function holoWorldEntryRead(data) {
  return get(data.hash);
}

function doGetLinkLoad(base, tag) {
  // get the tag from the base in the DHT
  var links = getLinks(base, tag);
  var linksFilled = [];
  for (var i = 0; i < links.length; i++) {
    var link = { H: links[i].Hash, tag: links[i].Entry };
    linksFilled.push(link);
  }
  return linksFilled;
}

function holoWorldEntryGetAll(data) {
  var worldHash = addAnchor('world', data.worldName);

  var matches = query({
    Return: { Entries: true },
    Constrain: {
      EntryTypes: ['world_entry_link'],
      Contains: '"Base":"' + worldHash +'"'
    }
  });

  debug(matches);

  var entries = doGetLinkLoad(worldHash, 'holoWorldEntry');

  if (entries instanceof Error) {
    debug('fail!');
    return [];
  } else {
    debug(entries);
    return entries;
  }
}

function holoWorldAddWorld(data) {
  return addAnchor('world', data.worldName);
}

function holoWorldsGetAll() {
  var worlds;
  try {
    var result = JSON.parse(call('anchors', 'anchors', 'world'));

    if (isErr(result)) {
      return '[]';
    }
    return JSON.stringify(result);
  } catch (e) {
    debug(e);
    return '[]';
  }
}

/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis() {
  debug('genesis!!!');
  return true;
}

// -----------------------------------------------------------------
//  validation functions for every DHT entry change
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case 'holoWorldEntry':
      return true;
    case 'world_entry_link':
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateLink(linkEntryType, baseHash, links, pkg, sources) {
  return true;
}

function validatePut(entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case 'holoWorldEntry':
      return true;
    default:
      // invalid entry name
      return false;
  }
}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case 'sampleEntry':
      return false;
    default:
      // invalid entry name
      return false;
  }
}

function validateDel(entryName, hash, pkg, sources) {
  switch (entryName) {
    case 'sampleEntry':
      return false;
    default:
      // invalid entry name
      return false;
  }
}

function validatePutPkg(entryName) {
  return true;
}
function validateLinkPkg(entryName) {
  return true;
}
function validateModPkg(entryName) {
  return null;
}
function validateDelPkg(entryName) {
  return null;
}
